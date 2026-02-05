
export interface Character {
  id: number;
  name: string;
  fileName: string;
  rarity: 'Common' | 'Middle' | 'High';
  level: number;
  price: number;
  bid: number;
  status: 'Active' | 'Cancelled';
  highestBidder?: string;
  yourBid?: number;
  wins?: number;
  loses?: number;
  creator?: string;
  createDate?: string;
  isLiked?: boolean;
}

export interface LotHistory {
  id: number;
  heroId: number;
  type: string;
  from: string;
  to: string;
  price: number;
  date: string;
}


export interface LikedCharacterProps {
  onClose: () => void;
}



export interface ClosingProps {
  onClose: () => void;
}

