import { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as Root,
  HeadTab,
  DetailList,
  DetailListTable,
  IcnOutside,
  IcnInvoice,
} from './List.style';
import Image from 'next/image';
import iconInvoice from '@public/icon-invoice.png';
import iconOutside from '@public/icon-outside.png';

export interface ListProps {
  className?: string;
  data: {
    orderReceived: Records[];
    order: Records[];
  };
}

enum ToggleDisplayEnum {
  Received = 'Received',
  Order = 'Order',
}

interface Records {
  orderNumber: string;
  supplier: string;
  destination: string;
  receivingAndShippingStatus: string;
  invoiceStatus: string;
  deliveryDate: string;
}

interface DetailListTableElementProps {
  type: ToggleDisplayEnum;
  display: ToggleDisplayEnum;
  list: Records[];
}

const DetailListTableElement = ({ type, display, list }: DetailListTableElementProps) => {
  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable>
        <tbody>
          <tr className={'head'}>
            {['オーダー番号', '受注先名', '出荷先名', '入出荷ステータス',
              '請求ステータス', '納入日付', '',
            ].map((item, index) => {
              return (<td key={index}>{item}</td>)
            })}
          </tr>
          {list.map((item, index) => {
            return (
              <tr key={index} className={'record'}>
                <td>{item.orderNumber}</td>
                <td>{item.supplier}</td>
                <td>{item.destination}</td>
                <td>{item.receivingAndShippingStatus}</td>
                <td className={'text-center'}>{item.invoiceStatus}</td>
                <td className={'text-center'}>{item.deliveryDate}</td>
                <td>
                  <IcnOutside>
                    <Image src={iconOutside}  alt={''}/>
                  </IcnOutside>
                  <IcnInvoice>
                    <Image src={iconInvoice}  alt={''}/>
                  </IcnInvoice>
                </td>
              </tr>
            )
          })}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}

export const List = ({ data, className }: ListProps) => {
  const [display, setDisplay] = useState<ToggleDisplayEnum>(ToggleDisplayEnum.Received);

  return (
    <Root className={clsx(
      `List`,
      className
    )}>
      <div>
        <HeadTab className={'text-center text-1xl mb-2'}>
          <li
            className={`${display === ToggleDisplayEnum.Received ? 'active' : ''}`}
            onClick={() => setDisplay(ToggleDisplayEnum.Received)}
          >受注オーダー</li>
          <li
            className={`${display === ToggleDisplayEnum.Order ? 'active' : ''}`}
            onClick={() => setDisplay(ToggleDisplayEnum.Order)}
          >発注オーダー</li>
        </HeadTab>
      </div>
      <DetailListTableElement
        type={ToggleDisplayEnum.Received}
        display={display}
        list={data.orderReceived}
      />
      <DetailListTableElement
        type={ToggleDisplayEnum.Order}
        display={display}
        list={data.order}
      />
    </Root>
  );
};
