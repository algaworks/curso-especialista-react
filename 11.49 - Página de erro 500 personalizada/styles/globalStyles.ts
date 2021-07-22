import { transparentize } from "polished";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    overflow-x: hidden;
  }

  body {
    background-color: ${(p) => p.theme.pageBackground};
    color: ${(p) => p.theme.pageForeground};
    font-family: "Lato", sans-serif;
  }

  .Pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
    gap: 4px;

    li {
      a {
        padding: 0 8px;
        min-width: 28px;
        height: 34px;
        transition: .25s ease;

        display: flex;
        justify-content: center;
        align-items: center;

        text-decoration: none;

        background-color: ${(p) => p.theme.inactiveElementBackground};
        color: ${(p) => p.theme.inactiveElementForeground};
        border-radius: ${(p) => p.theme.borderRadius};

        font-size: 12px;
      }

      &.disabled a {
        cursor: not-allowed;
        opacity: ${(p) => p.theme.inactiveElementOpacity};
      }

      &.selected a {
        background-color: ${(p) => p.theme.primaryBackground};
        color: ${(p) => p.theme.primaryForeground};

        cursor: default;

        &::before {
          content: 'Página';
          display: inline-block;
          margin-right: 4px;
        }
      }

      &:not(.selected,.disabled) {
        &:hover,
        &:focus {
          a {
            transform: translateY(-3px);
            box-shadow: 0 3px 6px ${(p) =>
              transparentize(0.9, p.theme.pageForeground)};
          }
        }
      }
    }
  }

  .MarkdownRenderer {
    max-width: 680px;
    margin: 48px auto;

    > * {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    p {
      font-size: 18px;
      line-height: 36px;
    }

    ul {
      font-size: 18px;
      line-height: 36px;
      margin-left: 32px;
    }

    h2 {
      font-size: 48px;
      font-weight: 500;
    }

    h3 {
      font-size: 36px;
      font-weight: 500;
    }

    h4 {
      font-size: 24px;
      font-weight: 500;
    }
    
    h5,h6 {
      font-size: 18px;
      font-weight: 500;
    }

    a {
      color: ${(p) => p.theme.primaryBackground};
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    code:not([class^='language']) {
      color: ${(p) => p.theme.pageBackground};
      background-color: ${(p) => p.theme.pageForeground};
      border-radius: ${(p) => p.theme.borderRadius};
      padding: 4px 8px;

      font-family: "Roboto Mono", monospace;
      font-weight: 300;
      font-size: 14px;

      white-space: nowrap;
    }

    pre > code {
      white-space: inherit!important;
      display: inline-block;
    }

    pre {
      color: ${(p) => p.theme.pageBackground};
      background-color: ${(p) => p.theme.pageForeground};
      border-radius: ${(p) => p.theme.borderRadius};
      overflow-x: auto;
    }

    img {
      max-width: 100%;
    }
  }
`;
