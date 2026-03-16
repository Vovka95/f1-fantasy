import type { PlayerResponse } from '../api/players-list-response.types';
import type { Player, PlayerPreview } from './player.type';

export const mapPlayer = (asset: PlayerResponse): Player => {
    return {
        id: asset.PlayerId,
        displayName: asset.DisplayName,
        positionName: asset.PositionName as 'DRIVER' | 'CONSTRUCTOR',
        teamName: asset.TeamName || '—',
        price: Number(asset.Value),
        points: Number(asset.OverallPpints),
        selectedPercent: Number(asset.SelectedPercentage),
        valueForMoney: asset.AdditionalStats.value_for_money,
        overtakingPts: asset.AdditionalStats.overtaking_pts,
    };
};

const mapPlayerToPreview = (asset: PlayerResponse): PlayerPreview => {
    return {
        id: asset.PlayerId,
        name: asset.FUllName || `${asset.FirstName} ${asset.LastName}`,
        shortName: asset.DisplayName,
        imageUrl: null,
        teamName: asset.TeamName || '—',
        positionName: asset.PositionName as 'DRIVER' | 'CONSTRUCTOR',
        value: Number(asset.Value),
        valueChange: Number(asset.new_value) - Number(asset.old_Value),
        overallPoints: Number(asset.OverallPpints),
        gamedayPoints: Number(asset.GamedayPoints),
        selectedPercentage: Number(asset.SelectedPercentage),
        isActive: asset.IsActive === '1',
        status: asset.Status,
    };
};

type PlayersListView = {
    table: Player[];
    preview: PlayerPreview[];
};

export const mapPlayers = (assets: PlayerResponse[]): PlayersListView => {
    return {
        table: assets.map(mapPlayer),
        preview: assets.map(mapPlayerToPreview),
    };
};
