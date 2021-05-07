import { Component, MouseEvent } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';

import { IframeManager } from '../../../services';
import { MessageDataInterface } from '../../../types';
import { Parser } from '../../parser';
import './index.scss';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  border: '3px dashed lightblue',
  position: 'relative',

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: '100%',
  boxSizing: 'border-box'
});

interface EditableRendererState {
    postMessage: MessageDataInterface;
    visible: Boolean[];
}

interface EditableRendererProps {
    pageConfig: MessageDataInterface;
}

export class EditableRenderer extends Component<EditableRendererProps, EditableRendererState> {
  constructor(props) {
    super(props);
    this.state = {
      postMessage: {
        config: {
          component: '',
          config: ''
        },
        index: 0,
        items: [
          {
            component: 'CustomerSwiper',
            config: '{"list": [{"url": "", "pic": ""}]}',
            id: 'a'
          },
          {
            component: 'CustomerText',
            config: '{"text": "this is text", "color": "#000", "fontSize": 20}',
            id: 'b'
          },
          {
            component: 'CustomerNav',
            config: '{"list": [{"url": "", "title": "NAV"}, {"url": "", "title": "NAV1"}, {"url": "", "title": "NAV2"}], "rowCount": 3}',
            id: 'c'
          },
        ],
        type: 'edit'
      },
      visible: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillMount () {
    IframeManager.subscrib(this.receiveMessage);
  }

  componentDidMount () {
      const { pageConfig } = this.props;
      pageConfig && this.setState({ postMessage: pageConfig });
  }

  componentWillUnmount () {
    IframeManager.unSubscrib();
  }

  componentDidShow () { }

  componentDidHide () { }

  receiveMessage = (e: any) => {
    if(!e.data.config) return;
    console.log(e.data);
    this.setState({ postMessage: e.data });
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.postMessage.items,
      result.source.index,
      result.destination.index
    );
    this.setState({
      postMessage: {...this.state.postMessage, items}
    });
  }

  onDelete = (id: string) => {
    
  }

  onAdd = (addType: string, index: number, e: ITouchEvent) => {
    e.stopPropagation();
    const message = {
      type: 'add',
      addType,
      index,
      items: this.state.postMessage.items
    }
    window.parent.postMessage(message, "*");
  }

  visible: Boolean[] = [];

  toggleVisible = (index: number, e: MouseEvent) => {
    console.log(e);
    let preStatus = this.state.visible[index];
    let visible = Array.from({ length: this.state.postMessage.items.length }, () => false);
    visible[index] = !preStatus;
    this.setState({ visible });
    const message = {
      type: 'edit',
      index,
      items: this.state.postMessage.items,
      config: this.state.postMessage.items[index]
    }
    window.parent.postMessage(message, "*");
  }

  getVisible = (index: number) => {
    return this.state.visible[index] ? 'visible' : 'hidden';
  }

  render () {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.postMessage.items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className='draggable-container'
                      onClick={(e) => this.toggleVisible(index, e)}
                    >
                      <View
                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                        className='draggable-container__oprator__del'
                        onClick={() => this.onDelete(item.id)}
                      >
                        <View className='at-icon at-icon-trash draggable-container__oprator__icon-del'></View>
                      </View>
                      
                      <View
                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                        className='draggable-container__oprator__add draggable-container__oprator__add-pre'
                        onClick={(e) => this.onAdd('pre', index, e)}
                      >
                        <View className='at-icon at-icon-add draggable-container__oprator__icon'></View>
                      </View>
                      <View
                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                        className='draggable-container__oprator__add draggable-container__oprator__add-next'
                        onClick={(e) => this.onAdd('next', index, e)}
                      >
                        <View className='at-icon at-icon-add draggable-container__oprator__icon'></View>
                      </View>
                      <Parser config={item.config} component={item.component}/>
                    </div>
                  )}
              </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}