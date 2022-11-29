import { useState } from 'react';
import produce from 'immer';

import BoardContext from './BoardContext';

import { List } from '../List';
import { loadLists } from '../../services/api';

import * as S from './style';


const data = loadLists();

export function Board() {
  const [lists, setLists] = useState(data);

  function moveCard(fromList, toList, from, to) {
    setLists(produce(lists, (draft) => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, moveCard }}>
      <S.Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </S.Container>
    </BoardContext.Provider>
  )
}
