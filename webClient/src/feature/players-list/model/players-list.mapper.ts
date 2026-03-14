import type { PlayerResponse } from '../api/players-list-response.types';
import type { Player } from '@/entities/player';

const mapPlayer = (asset: PlayerResponse): Player => {
    return {
        id: asset.PlayerId,

        displayName: asset.DisplayName,

        type: asset.PositionName as 'DRIVER' | 'CONSTRUCTOR',

        teamName: asset.TeamName || '—',

        price: Number(asset.Value),

        points: Number(asset.OverallPpints),

        selectedPercent: Number(asset.SelectedPercentage),

        valueForMoney: asset.AdditionalStats.value_for_money,

        overtakingPts: asset.AdditionalStats.overtaking_pts,
    };
};

export const mapPlayersList = (assets: PlayerResponse[]): Player[] => {
    return assets.map(mapPlayer);
};
