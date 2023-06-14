export function getPaginationParams(
  query: any
): [page: number, perPagae: number] {
  const { page, perPage } = query

  const perPageNumber =
    //aqui se verifica se  per page é uma string e se ele é positivo, se sim ele é o convertido para um inteiro de base  10, se não vai ser retornado o 10
    typeof perPage === 'string' && parseInt(perPage, 10) > 0
      ? parseInt(perPage, 10)
      : 10

  // caso a pagnina n for fornecida queremos o valor um para exibir a primeira pagina
  const pageNumber =
    typeof page === 'string' && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1

  return [pageNumber, perPageNumber]
}
