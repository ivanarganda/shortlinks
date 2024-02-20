import Resume from './Resume';
import useFadeIn from './../hooks/state/useFadeIn';
import React from 'react';

export default function Dashboard() {

  const [ Section ] = useFadeIn(true);

  return (  
    <Section>
        <Resume />
    </Section>
  )
}
