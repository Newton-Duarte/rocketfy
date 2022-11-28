import { MdAdd} from 'react-icons/md';
import { Card } from '../Card';

import * as S from './styles'

export function List({ data }) {
  return (
    <S.Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </ul>
    </S.Container>
  )
}
