import { clsx } from 'clsx';
import {
  GlobalMenu as Root,
} from './GlobalMenu.style';
import Link from 'next/link';
import React from 'react';

interface GlobalMenuProps {
  className?: string;
}

export const GlobalMenu = ({ className }: {
  className?: string;
}) => {
  return (
    <Root className={clsx(
      `GlobalMenu home`,
      className
    )}>
      <ul>
        {/* オーダー */}
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>オーダー一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/create"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>オーダー作成（CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/create/edi"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>注文（中小企業EDI CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/create/edi/voluntary-chain"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>注文（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/create/edi/voluntary-chain/answer"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>注文回答（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li>

        {/* 入出荷 */}
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/delivery-document/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>入出荷一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/delivery-document/create"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>入出荷作成（CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/delivery-document/create/edi"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>出荷案内（中小企業EDI CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/delivery-document/create/edi/voluntary-chain"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>出荷案内（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/delivery-document/create/edi/voluntary-chain/answer"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>仕入明細（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li>


        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/invoice-document/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>請求一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/price-master/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>価格マスタ一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/production-order/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>製造指図一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/production-version/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>製造バージョン一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/product/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>品目一覧</div>
          </Link>
        </li>
		<li>
           <Link
            className={'listLink flex items-center justify-start'}
            href="/bill-of-material/list"
           >
             <div className={'titleIcon'}>●</div>
            <div className={'title'}>部品表一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/business-partner/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>ビジネスパートナ一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/supply-chain-relationship/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>サプライチェーンリレーションシップマスタ一覧</div>
          </Link>
        </li>
		<li>
           <Link
            className={'listLink flex items-center justify-start'}
            href="/work-center/list"
           >
             <div className={'titleIcon'}>●</div>
            <div className={'title'}>作業区一覧</div>
          </Link>
        </li>
		<li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/operations/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>作業手順一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/equipment/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>設備一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>住所一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>在庫一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>見積一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>価格一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>住所一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'flex justify-start items-center listLink'}
            href="/orders/list"
          >
            <div className={'titleIcon'}>●</div>
            <div className={'title'}>金融機関一覧</div>
          </Link>
        </li>
      </ul>
    </Root>
  );
}
