import { List } from '../List';

import * as S from './style';

import { loadLists } from '../../services/api';

export function Board() {
  const lists = loadLists();

  return (
    <S.Container>
      {lists.map((list) => (
        <List key={list.title} data={list} />
      ))}
    </S.Container>
  )
}
