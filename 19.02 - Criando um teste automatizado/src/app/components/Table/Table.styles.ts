import styled from "styled-components";
import { transparentize } from "polished";

export const Wrapper = styled.table`
  width: 100%;
  color: #274060;
  background-color: ${transparentize(0.95, "#274060")};
`;

export const Heading = styled.thead`
  background-color: ${transparentize(0.85, "#274060")};
`;

export const HeadingRow = styled.tr``;

export const HeadingCell = styled.th`
  height: 32px;
  font-size: 14px;
  padding: 0 8px;
`;

export const Body = styled.tbody``;

export const BodyRow = styled.tr``;

export const BodyCell = styled.td`
  height: 40px;
  font-size: 12px;
  font-weight: 500;
  padding: 0 8px;
`;

export const TablePagination = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;

  ul {
    display: flex;
    list-style: none;
    gap: 4px;

    li {
      &.selected {
        a {
          background-color: rgb(0, 153, 255);
          color: rgb(243, 248, 250);
          pointer-events: none;
        }
      }

      a {
        transition: 0.25s ease;
        outline: none;
        background-color: rgb(243, 248, 250);
        color: rgb(39, 64, 96);
        border: 1px solid rgba(39, 64, 96, 0.1);
        min-width: 32px;
        height: 32px;
        padding: 0px 6px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;

        &:hover,
        &:focus {
          box-shadow: 0 6px 6px rgba(0, 0, 0, 0.15);
          transform: translateY(-3px);
        }
      }

      &.disabled a {
        pointer-events: none;
        opacity: 0.5;
        outline: none;
      }
    }
  }
`;
