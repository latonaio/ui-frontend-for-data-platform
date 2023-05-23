import { clsx } from 'clsx';
import {
  StockLabel as StockLabelElement,
  StockLabelColumn,
  Label,
} from './StockLabel.style';

interface StockLabelProps {
  className?: string;
}

export const StockLabel = ({ className }: StockLabelProps) => {
  return (
    <StockLabelElement className={clsx(
      'font-bold',
      className
    )}>
      <StockLabelColumn className={'StockLabelColumn'}>
        <Label className={'Label'} color='yellow'>
          <div className={'text-lg'}>入出荷先在庫: 7</div>
          <div className={'text-xs'}>ローソン虎ノ門支店</div>
        </Label>
      </StockLabelColumn>
      <StockLabelColumn className={'StockLabelColumn'}>
        <Label className={'Label'} color='skin'>
          <div className={'text-lg'}>入出荷元在庫: 1000</div>
          <div className={'text-xs'}>山崎製パン杉並工場</div>
        </Label>
      </StockLabelColumn>
    </StockLabelElement>
  )
}
