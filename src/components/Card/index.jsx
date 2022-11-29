import { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/BoardContext';

import * as S from './styles';

export function Card({ index, listIndex, data }) {
  const cardRef = useRef();
  const { moveCard } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {
      index,
      listIndex,
      id: data.id,
      content: data.content
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = cardRef.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      moveCard(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(cardRef));

  return (
    <S.Container ref={cardRef} isDragging={isDragging}>
      <header>
        {data.labels.map((label) => <S.Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      <img src="https://github.com/newton-duarte.png" alt="Newton Duarte" />
    </S.Container>
  )
}
