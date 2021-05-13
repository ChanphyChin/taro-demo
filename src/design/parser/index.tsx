import { CustomerSwiper, CustomerText, CustomerNav } from '../components';
import { useEffect } from 'react';

interface ParserProps {
  component: string;
  config: string;
  disabled?: Boolean;
}

export const Parser = (props: ParserProps) => {
  const config = JSON.parse(props.config);
  switch (props.component) {
    case 'CustomerSwiper': 
      return <CustomerSwiper config={config} />;
    case 'CustomerText' :
      return <CustomerText config={config} />;
    case 'CustomerNav' :
      return <CustomerNav config={config} disabled={props.disabled as Boolean} />
  }
  return null;
}
