import "@testing-library/react";
import { AppStore, createAppStore } from "../core/store";
import { fetchPosts } from "../core/store/Post.slice";

jest.mock("danielbonifacio-sdk", () => ({
  PostService: {
    getAllPosts: () => ({
      page: 2,
      size: 9,
      totalPages: 15,
      totalElements: 442,
      content: [
        {
          id: 42,
          slug: "como-fazer-x-coisas-com-react-js",
          title: "Como fazer X coisas com React.js",
          imageUrls: {
            default:
              "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
            small:
              "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
            medium:
              "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
            large:
              "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg",
          },
          editor: {
            id: 29,
            name: "Daniel Bonifacio",
            avatarUrls: {
              default:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
              small:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
              medium:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
              large:
                "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg",
            },
            createdAt: "2017-03-04T00:12:45Z",
          },
          createdAt: "2020-12-04T00:12:45-03:00",
          updatedAt: "2020-12-05T00:12:45-03:00",
          published: true,
          tags: ["JavaScript"],
          canBePublished: true,
          canBeUnpublished: true,
          canBeDeleted: true,
          canBeEdited: true,
        },
      ],
    }),
  },
}));

let store: AppStore;

describe("Post slice", () => {
  beforeEach(() => {
    store = createAppStore();
  });

  // unitário
  it("start with empty array on content", () => {
    const state = store.getState().post;
    expect(state.paginated?.content).toHaveLength(0);
  });

  // integração
  it("updates state after fetchPosts dispatch", async () => {
    await store.dispatch(fetchPosts({}));
    const state = store.getState().post;

    expect(state.paginated?.content?.length).toBeGreaterThanOrEqual(1);
  });
});
