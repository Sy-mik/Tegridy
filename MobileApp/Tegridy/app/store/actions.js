import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";

export const FETCH_SCHEDULED = 'FETCH_SCHEDULED';
export const FETCH_PLANTS = 'FETCH_PLANTS';

export const fetchScheduled = (data) => ({
    type: FETCH_SCHEDULED,
    data
});

export const fetchPlants = (data) => ({
    type: FETCH_PLANTS,
    data
});
 