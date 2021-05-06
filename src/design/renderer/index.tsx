import { Component } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Text } from '@tarojs/components';
import cloneDeep from 'lodash/cloneDeep';

import { Parser } from '../parser';
import './index.scss';

const config = [
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
];


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

export class Renderer extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: config,
      visible: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillMount () {
    window.addEventListener("message", this.receiveMessage, false);
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  receiveMessage = (e: any) => {
    console.log(e);
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({
      items
    });
  }

  onDelete = (id: string) => {
        const items = JSON.parse(JSON.stringify(this.state.items));
        const index = items.findIndex(item => item.id === id);
        items.splice(index, 1);
        this.setState({ items });
  }

  onAdd = (addType: string, index: number) => {
    const message = {
      type: 'add',
      addType,
      index,
      items: this.state.items
    }
    window.parent.postMessage(message, "*");
  }

  visible: Boolean[] = [];

  toggleVisible = (index: number, e) => {
    let preStatus = this.state.visible[index];
    let visible = Array.from({ length: this.state.items.length }, () => false);
    visible[index] = !preStatus;
    this.setState({ visible });
    const message = {
      type: 'edit',
      index,
      items: this.state.items,
      config: this.state.items[index]
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
              {this.state.items.map((item, index) => (
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
                      <Text
                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                        className='draggable-container__oprator__del'
                        onClick={() => this.onDelete(item.id)}
                      >
                        x
                      </Text>
                      <Text
                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                        className='draggable-container__oprator__add draggable-container__oprator__add-pre'
                        onClick={() => this.onAdd('pre', index)}
                      >
                        +
                      </Text>
                      <Text
                        style={{ visibility: this.state.visible[index] ? 'visible' : 'hidden' }}
                        className='draggable-container__oprator__add draggable-container__oprator__add-next'
                        onClick={() => this.onAdd('next', index)}
                      >
                        +
                      </Text>
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
