import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UserEarnings from "../app/features/UserEarnings";
import store from "../core/store";

jest.mock("../core/hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    user: {
      id: 29,
      name: "Daniel Bonifacio",
      email: "daniel.bonifacio@algaworks.com",
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
      bio: "Gosta de JavaScript.",
      role: "EDITOR",
      birthdate: "1999-04-01",
      phone: "5527977778888",
      taxpayerId: "03388492288",
      pricePerWord: 0.06,
      active: true,
      createdAt: "2020-03-04T00:12:45-03:00Z",
      bankAccount: {
        bankCode: "001",
        agency: "0001",
        number: "254856",
        digit: "5",
        type: "SAVING",
      },
      location: {
        country: "Brasil",
        state: "Espírito Santo",
        city: "Vila Velha",
      },
      skills: [
        {
          name: "JavaScript",
          percentage: 95,
        },
      ],
      metrics: {
        weeklyEarnings: 1547.34,
        monthlyEarnings: 9547.24,
        lifetimeEarnings: 49547.24,
        weeklyWords: 3293,
        monthlyWords: 14587,
        lifetimeWords: 758659,
      },
      updatedAt: "2020-03-04T00:12:45-03:00Z",
      updatedBy: {
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
      },
      createdBy: {
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
      },
      canBeActivated: true,
      canBeDeactivated: true,
      canSensitiveDataBeUpdated: true,
    },
  }),
}));

describe("User Earnings", () => {
  it("renders component correctly", async () => {
    render(
      <Provider store={store}>
        <UserEarnings />
      </Provider>
    );
    const weeklyEarnings = screen.getByTestId("weeklyEarnings");
    expect(weeklyEarnings).toBeInTheDocument();
  });
});
