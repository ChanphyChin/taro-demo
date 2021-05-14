import { CustomerSwiper, CustomerText, CustomerNav, CustomerBanner } from '../components';

interface ParserProps {
  component: string;
  config: string;
  disabled?: Boolean;
}

export const Parser = (props: ParserProps) => {
  const config = JSON.parse(props.config);
  switch (props.component) {
    case 'CustomerSwiper': 
      return <CustomerSwiper config={config} disabled={props.disabled as Boolean} />;
    case 'CustomerText' :
      return <CustomerText config={config} />;
    case 'CustomerNav' :
      return <CustomerNav config={config} disabled={props.disabled as Boolean} />
    case 'CustomerBanner' :
      return <CustomerBanner config={config} disabled={props.disabled as Boolean} />
  }
  return null;
}
