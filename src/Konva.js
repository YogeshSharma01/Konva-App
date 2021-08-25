import React,{ useState } from 'react'
import Uper from './header';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import Button from './Button';
import EditIcon from '@material-ui/icons/Edit';
import { Stage, Layer, Rect, Transformer,Text } from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
  
    React.useEffect(() => {
      if (isSelected) {
        
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    return (
      <React.Fragment>
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
             
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </React.Fragment>
    );
  };
  
  

const Konva = () =>{
   
    const [bgColor, setBgColor] = useState('orange');
    const changeBG = (event) =>{
        setBgColor(event.target.style.backgroundColor = "orange") ;
    }
    const changeBG_2 = (event) =>{
        setBgColor(event.target.style.backgroundColor = "white") ;
    }
    // button
    
      
    const initialRectangles = [
    {
      x: 20,
      y: 200,
      width: 100,
      height: 50,
      fill:bgColor,
      id: 'rect1',
      text:'hello',
      cornerRadius:10,
      stroke: 'white',
      strokeWidth: 2,
    },
  ];


    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [selectedId, selectShape] = React.useState(null);
  
    const checkDeselect = (e) => {
      
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
    };


    return (
        <>
        <Uper/>
        <div className="container">
        <div>
        
        <Stage style={{position:'absolute'}}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
              <>
              <Text x={20} y={10}  text='Heading' fontSize='50' fill='white'/>
              <Text  x={20} y={100} text='sub body text' fontSize='30' fill='white'/>
              <Text x={20} y={140} text='body text' fontSize='30' fill='white'/>
            <Rectangle 
            className="btn"
            
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
            </>
          );
        })}
      </Layer>
    </Stage> 
    
    <EditIcon className="edit_icon"/>
 
       
        <img style={{width:"100%", height:"100vh"}} src="https://s.w-x.co/in-shimla_mountains.jpg" alt="mountain"></img>
        </div>
        <div className="footer">
        <div className="main_footer">
        <div onClick={changeBG}  className="btn-2"  ></div>
        <div onClick={changeBG_2}  className="btn-2"  ></div>
        <LineWeightIcon className="icon"/>

        <div className="main_footer_2">
        <h1 className="change">Change Templet + </h1>
        <Button />
        </div>
        </div>
        </div>
        </div>
        </>
    );
}

export default Konva;

