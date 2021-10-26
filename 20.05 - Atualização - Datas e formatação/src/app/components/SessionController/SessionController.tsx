import { format } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";
import parseISO from "date-fns/parseISO";
import { useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import AuthService from "../../../auth/Authorization.service";
import useAuth from "../../../core/hooks/useAuth";
import confirm from "../../../core/utils/confirm";
import Button from "../Button/Button";
import * as SC from "./SessionController.styles";

export interface SessionControllerProps {
  name: string;
  description: string;
  onLogout?: () => any;
}

function SessionController(props: SessionControllerProps) {
  const { user } = useAuth();

  const logout = useCallback(() => {
    confirm({
      title: "Deseja sair?",
      onConfirm: AuthService.imperativelySendToLogout,
    });
  }, []);

  if (!user) return <Skeleton height={215} />;

  return (
    <SC.Wrapper>
      <SC.Avatar src={user.avatarUrls.small} />
      <SC.Name>{user.name}</SC.Name>
      <SC.Description>
        Editor desde{" "}
        <strong>
          {format(parseISO(user.createdAt), "MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </strong>
      </SC.Description>
      <Button variant="danger" label="Logout" onClick={logout} />
    </SC.Wrapper>
  );
}

export default SessionController;
