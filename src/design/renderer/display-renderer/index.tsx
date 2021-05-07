import { MessageDataInterface } from '../../../types';
import { Parser } from '../../parser';

export const DisplayRenderer = (props: { pageConfig: MessageDataInterface }) => {
    console.log(props);
    if(props.pageConfig) {
        const { pageConfig: { items } } = props;
        return (
            <div>
            {items.map(item => {
                return <Parser config={item.config} component={item.component}/>
            })}
            </div>
        );
    }
    return null;
}