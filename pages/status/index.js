import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);

  const responseBody = await response.json();
  return responseBody;
}
export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <Database />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <div>Atualizado em: {updatedAtText}</div>;
}

function Database() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtDatabaseInfo = "Carregando...";

  if (!isLoading && data) {
    const { max_connections, opened_connections, version } =
      data.dependencies.database;
    updatedAtDatabaseInfo = (
      <>
        <div>Maximas conecções: {max_connections}</div>
        <div>Conecções abertas: {opened_connections}</div>
        <div>Versão do banco: {version}</div>
      </>
    );
  }

  return (
    <>
      <h2>Informações do banco</h2>
      <div>{updatedAtDatabaseInfo}</div>
    </>
  );
}
