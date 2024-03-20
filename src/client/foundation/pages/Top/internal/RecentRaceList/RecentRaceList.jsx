import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Stack } from "../../../../components/layouts/Stack";
import { Color, FontSize, Radius, Space } from "../../../../styles/variables";
import { formatCloseAt } from "../../../../utils/DateUtils";

export const RecentRaceList = React.memo(({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
});

RecentRaceList.displayName = "RecentRaceList";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ItemWrapper = styled.li`
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  opacity: ${({ $opacity }) => $opacity};
  padding: ${Space * 3}px;

  animation: ${fadeIn} 0.5s cubic-bezier(0.2, 0.6, 0.35, 1);
`;

const RaceButton = styled(LinkButton)`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

const RaceTitle = styled.h2`
  font-size: ${FontSize.LARGE};
  font-weight: bold;
`;

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
const Item = React.memo(({ race }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  return (
    <ItemWrapper>
      <Stack
        horizontal
        alignItems="center"
        gap={Space * 2}
        justifyContent="space-between"
      >
        <Stack gap={Space * 1}>
          <RaceTitle>{race.name}</RaceTitle>
          <p>{closeAtText}</p>
        </Stack>

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={Space * 2}>
            <img
              alt=""
              height={100}
              loading="lazy"
              src={race.image.replace(".jpg", ".webp")}
              style={{ objectFit: "cover" }}
              width={100}
            />
            <RaceButton to={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
});

Item.displayName = "RecentRaceListItem";

RecentRaceList.Item = Item;
