import React from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Rectangle = ({
  id,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDoubleClick,
  globalWidth,
  rowNote,
  changeNoteCallback,
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
          changeNoteCallback(id, {
            rowNote: rowNote,
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

          // we will reset it back
          node.scaleX(1);

          changeNoteCallback(id, {
            rowNote: rowNote,
            start: node.x() / globalWidth,
            end: Math.ceil(((node.width() * scaleX) / globalWidth) * 8) / 8,
          });
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
      props.addNoteCallback({
        start: Math.max(Math.ceil(((e.evt.clientX-150) / props.width) * 8) / 8, 0),
        end: Math.min(Math.ceil(((e.evt.clientX-150) / props.width) * 8) / 8 + 0.125, 1),
        rowNote: props.rowNote,
      });
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
        {props.notes.map((note) => {
          return (
            <Rectangle
              key={note.id}
              id={note.id}
              rowNote={note.rowNote}
              shapeProps={{
                x: note.start * props.width,
                y: 0,
                width: (note.end - note.start) * props.width,
                height: props.height,
                fill: "red",
              }}
              isSelected={note.id === selectedId}
              onSelect={() => {
                selectShape(note.id);
              }}
              changeNoteCallback={props.changeNoteCallback}
              rowIndex={props.rowIndex}
              onDoubleClick={() => {
                props.deleteNoteCallback(note.id);
              }}
              globalWidth={props.width}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
