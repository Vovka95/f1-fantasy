type PlayerAvatarProps = {
    playerId: string;
    avatarImageUrl: string;
    name: string;
    onClick?: (playerId: string) => void;
};

export const PlayerAvatar = ({
    avatarImageUrl,
    name,
    playerId,
    onClick,
}: PlayerAvatarProps) => {
    return (
        <div
            onClick={() => onClick?.(playerId)}
            className="flex items-center justify-center"
        >
            <img
                className="w-7 h-7 rounded-full border-2 border-white"
                src={avatarImageUrl}
                alt={name}
            />
        </div>
    );
};
