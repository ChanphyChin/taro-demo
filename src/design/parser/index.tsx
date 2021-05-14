import { CustomerSwiper, CustomerText, CustomerNav, CustomerBanner } from '../components';

interface ParserProps {
  component: string;
  config: string;
  isEdit?: Boolean;
}

export const Parser = (props: ParserProps) => {
  const config = JSON.parse(props.config);
  switch (props.component) {
    case 'CustomerSwiper': 
      return <CustomerSwiper config={config} isEdit={props.isEdit as Boolean} />;
    case 'CustomerText' :
      return <CustomerText config={config} isEdit={props.isEdit as Boolean} />;
    case 'CustomerNav' :
      return <CustomerNav config={config} isEdit={props.isEdit as Boolean} />
    case 'CustomerBanner' :
      return <CustomerBanner config={config} isEdit={props.isEdit as Boolean} />
  }
  return null;
}
