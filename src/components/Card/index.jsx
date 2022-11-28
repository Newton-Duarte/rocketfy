
import * as S from './styles';

export function Card({ data }) {
  return (
    <S.Container>
      <header>
        {data.labels.map((label) => <S.Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      <img src="https://github.com/newton-duarte.png" alt="Newton Duarte" />
    </S.Container>
  )
}
