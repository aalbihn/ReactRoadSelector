import { GeoJSON, useMapEvents  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import axios from 'axios'
import L from 'leaflet'
import './Roads.css'
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedRoadFeature, setSelectedRoadFeatures, removeSelectedRoadFeature } from '../../store/SelectedRoadFeatureSlice'

export default function Roads() {

    const dispatch = useDispatch();
    const selectedRoadFeatures = useSelector(state => state.selectedRoadFeatures.features)
    const [geoJson, setGeoJson] = useState([]);

    const map = useMapEvents({
        moveend() { updateRoads(map) },
        load() { updateRoads(map) },
        areaselected(event) { selectRoadFeaturesArea(event.bounds) }  
    })

    /* Enable area selection*/
    map.selectArea.enable();
    map.selectArea.setValidate();
    //TODO: Disable selecting roads multiple times with area selection.

    const roadTypes = { 
        1.0: { type: 'motorway',        style: { 'color': '#8b0881' } },
        1.1: { type: 'motorway ramp',   style: { 'color': '#8b0881' } },
        1.3: { type: 'primary',         style: { 'color': '#04c4ca' } },
        1.4: { type: 'primary ramp',    style: { 'color': '#04c4ca' } },
        1.5: { type: 'secondary',       style: { 'color': '#04ca9f' } },
        1.6: { type: 'secondary ramp',  style: { 'color': '#04ca9f' } },
        1.7: { type: 'tertiary',        style: { 'color': '#ca9c04' } },
        1.8: { type: 'tertiary ramp',   style: { 'color': '#ca9c04' } },
        2.1: { type: 'street',          style: { } },
        2.6: { type: 'residential',     style: { } },
        3.1: { type: 'living street',   style: { } },
        5.1: { type: 'service',         style: { } }
    }

    const selectedStyle = () => {
        return {'color': '#17f762', 'weight': '10px'}
    }

    const defaultStyle = (feature) => {
        const featureRoadType = roadTypes[feature.properties.priority];
        if(featureRoadType !== undefined) {
            return featureRoadType.style
        }            
    }

    async function updateRoads(map) {
        const geoJsonResponse = await getRoads(map.getBounds())
        setGeoJson(geoJsonResponse)
    }

    async function getRoads(bounds) {

        const southEastCorner = Object.values(bounds.getSouthEast()).join(' ');
        const northWestCorner = Object.values(bounds.getNorthWest()).join(' ');
        const response = await axios.get('http://localhost:8080/lmdbroadwfs/geojson', {
            params: {
                SERVICE: 'WFS',
                REQUEST: 'GetFeature',
                VERSION: '2.0.0',
                TYPENAMES: 'LmdbRoad',
                SRSNAME: 'EPSG:4326',
                STARTINDEX: 0,
                COUNT: 100000,
                FILTER: '<fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:gml="http://www.opengis.net/gml/3.2"><fes:And><fes:BBOX><fes:ValueReference>centerLine</fes:ValueReference><gml:Envelope srsName="EPSG:4326">' +
                    '<gml:lowerCorner>' + southEastCorner + '</gml:lowerCorner>' +
                    '<gml:upperCorner>' + northWestCorner + '</gml:upperCorner>' +
                    '</gml:Envelope></fes:BBOX><fes:PropertyIsGreaterThan xmlns:fes="http://www.opengis.net/fes/2.0"><fes:Literal xmlns:fes="http://www.opengis.net/fes/2.0">2</fes:Literal><fes:ValueReference>priority</fes:ValueReference></fes:PropertyIsGreaterThan></fes:And></fes:Filter>'
            }
        });
        return response.data;
    }

    function onFeature(feature, layer) {
        layer.on({
            click: (event) => { selectFeature(event.target.feature) }    
        })
    }

    //TODO: move this to Selected Road to be applied only for the table view of the road, no need to set additional props on the feature.
    function enrichFeature(feature) {

        const featureRoadType = roadTypes[feature.properties.priority];
        if(feature.properties.roadtype === undefined) {
            if(featureRoadType !== undefined) {
                feature.properties.roadtype = featureRoadType.type;
            } else {
                feature.properties.roadtype = 'unknown';
            }
        }
        if(feature.properties.isoneway === undefined) {
            if(feature.properties.oneway > 0) {
                feature.properties.isoneway = 'No';
            } else {
                feature.properties.isoneway = 'Yes';
            }
        }
    }

    function selectFeature(feature) {    
        if(isFeatureAlreadySelected(feature)) {
            dispatch(removeSelectedRoadFeature(feature));
        } else {
            enrichFeature(feature);
            dispatch(addSelectedRoadFeature(feature));
        }        
    }

    function isFeatureAlreadySelected(feature) {
        let result = false;
        selectedRoadFeatures.forEach((selectedFeature) => {
            if(selectedFeature.properties.gid === feature.properties.gid) {
                result = true;
            }
        })

        return result;
    }

    function selectRoadFeaturesArea(bounds){      
        if(geoJson.length !== 0) {
            const areaFeatures = [];
             geoJson.features.forEach((feature)=> {
                feature.geometry.coordinates.forEach((coordinate) =>{
                    const firstPoint = coordinate[0];
                    const lastPoint = coordinate[coordinate.length - 1]
                    if(L.latLngBounds(bounds).contains({lat: firstPoint[1], lng: firstPoint[0]}) &&
                        L.latLngBounds(bounds).contains({lat: lastPoint[1], lng: lastPoint[0]})) {
                        
                        enrichFeature(feature)
                        areaFeatures.push(feature)       
                    }
                })
            })
            dispatch(setSelectedRoadFeatures(areaFeatures))
        }       
    }

    let layers = [<GeoJSON pathOptions={defaultStyle} onEachFeature={(feature, layer) => onFeature(feature, layer)} key={Math.floor(Math.random() * 999999)} data={geoJson} />]

    if(selectedRoadFeatures != null) {
        layers.push(<GeoJSON pathOptions={selectedStyle} onEachFeature={(feature, layer) => onFeature(feature, layer)} key={Math.floor(Math.random() * 999999)} data={selectedRoadFeatures}></GeoJSON>)
    }

    return layers;
        
}
