import * as WPC from './WordPriceCounter.styles'

export interface WordPriceCounterProps {
  wordsCount: number;
  pricePerWord: number;
}

function WordPriceCounter (props: WordPriceCounterProps) {
  if (props.wordsCount < 0)
    throw Error('A quantidade de palavras não pode ser negativa')

  return <WPC.Wrapper>
    <WPC.WordCounter>{ props.wordsCount } palavras</WPC.WordCounter>
    <WPC.PricePrivew>{(props.pricePerWord * props.wordsCount).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2
    })}</WPC.PricePrivew>
  </WPC.Wrapper>
}

export default WordPriceCounter