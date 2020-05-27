import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Rectangle = ({
  id,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDoubleClick,
  globalWidth,
  // loopData,
  rowIndex,
  changeLoopDataCallback,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        ref={shapeRef}
        {...shapeProps}
        draggable
        cornerRadius={30}
        dragBoundFunc={(pos) => {
          return {
            x: Math.ceil(pos.x / (globalWidth / 8)) * (globalWidth / 8),
            y: 0,
          };
        }}
        onDragEnd={(e) => {
          // onChange({
          //   start: e.target.x() / globalWidth,
          //   end: e.target.x() / globalWidth + shapeProps.width / globalWidth,
          // });
          changeLoopDataCallback(id, {
            noteIndex: rowIndex,
            start: e.target.x() / globalWidth,
            end: e.target.x() / globalWidth + shapeProps.width / globalWidth,
          });
        }}
        onTransform={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          // const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          // node.scaleY(1);

          // onChange({
          //   ...shapeProps,
          //   x: node.x(),
          //   // y: node.y(),
          //   // set minimal value
          //   width:
          //     Math.ceil((node.width() * scaleX) / (globalWidth / 8)) *
          //     (globalWidth / 8),
          //   // height: Math.max(node.height() * scaleY)
          // });

          changeLoopDataCallback(id, {
            noteIndex: rowIndex,
            start: node.x() / globalWidth,
            end: Math.ceil(((node.width() * scaleX) / globalWidth) * 8) / 8,
          });

          // onChange({
          //   // ...shapeProps,
          //   start: node.x() / globalWidth,
          //   end: Math.ceil((node.width() * scaleX) / globalWidth*8)/8,
          // });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          enabledAnchors={["middle-right"]}
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

export default function SamplrRow(props) {
  const [selectedId, selectShape] = React.useState(null);

  const setData = (data) => {
    props.changeLoopDataCallback(props.rowIndex, data);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const checkNew = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      // const a = props.loopProps.slice();
      // console.log(a);
      props.addLoopDataCallback({
        start: Math.ceil(((e.evt.clientX - 275) / props.width) * 8) / 8,
        end: Math.ceil(((e.evt.clientX - 275) / props.width) * 8) / 8 + 0.125,
        noteIndex: props.rowIndex,
      });
      // setData(
      //   a.concat([
      //     {
      //       // noteIndex:
      //       start: Math.ceil(((e.evt.clientX - 275) / props.width) * 8) / 8,
      //       end:
      //         Math.ceil(((e.evt.clientX - 275) / props.width) * 8) / 8 + 0.125,
      //     },
      //   ])
      // );
    }
  };

  return (
    <Stage
      width={props.width}
      height={props.height}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      onDblClick={checkNew}
    >
      <Layer>
        {props.loopProps &&
          props.loopProps
            // .map((loop, i) => (loop.loop.id = i))
            
            .map((loop, i) => {
              if (loop.noteIndex === props.rowIndex) {
                return {
                  id: i,
                  x: loop.start * props.width,
                  y: 0,
                  width: (loop.end - loop.start) * props.width,
                  height: props.height,
                  fill: "red",
                };
              }
              return null;
            })
            .filter((x) => x !== null)
            .map((rect) => {
              return (
                <Rectangle
                  key={rect.id}
                  id={rect.id}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  loopData={props.loopProps}
                  changeLoopDataCallback={props.changeLoopDataCallback}
                  // onChange={(newAttrs) => {
                  //   const rects = props.loopProps.slice();
                  //   rects[i] = newAttrs;
                  //   setData(rects);
                  // }}
                  rowIndex={props.rowIndex}
                  onDoubleClick={() => {
                    // const rects = props.loopProps.slice();
                    // rects.splice(i, 1);
                    props.deleteLoopDataCallback(rect.id);
                  }}
                  globalWidth={props.width}
                />
              );
            })}
      </Layer>
    </Stage>
  );
}

// render(<App />, document.getElementById("root"));
