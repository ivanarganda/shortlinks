import { useParams } from 'react-router-dom'
import useShortLink from '../hooks/state/useShortLink'
import React from 'react';

export default function RedirectShort() {

    const { key , code } = useParams( null );

    useShortLink( key , code);

}
