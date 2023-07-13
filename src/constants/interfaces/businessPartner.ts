interface BusinessPartnerItem {
	BusinessPartner: number;
	BusinessPartnerName: string;
	IsMarkedForDeletion: boolean;
  }
  
interface BusinessPartnerDetailExconfList{
	BusinessPartner: number;
	Existences: BusinessPartnerDetailExconfListItem[];
}

interface BusinessPartnerDetailExconfListHeader extends BusinessPartnerItem {
}
  
interface BusinessPartnerDetailExconfListItem {
	Content: string;
	Exist: boolean;
	Param: unknown[];
}
	
interface BusinessPartnerContentListItem extends BusinessPartnerItem {
	BusinessPartnerFullName: string;
	Industry: string;
	LegalEntityRegistration: number;
	Country: string;
	Language: string;
	Currency: string;
	AddressID: number;
	PostalCode: string;
	CityName: string;
	StreetName: string;
	Building: string;
	Floor: number;
	Room: string;
	TimeZone: string;
	LocalSubRegion: string;
	LocalRegion: string;
	GlobalRegion: string;
	District: string;
	ValidityStartDate: string;
	ValidityEndDate: string;
}
	
  export type {
	BusinessPartnerItem,
	BusinessPartnerDetailExconfList,
	BusinessPartnerDetailExconfListHeader,
	BusinessPartnerContentListItem,
  }
  
  