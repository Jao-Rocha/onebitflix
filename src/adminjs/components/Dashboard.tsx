//arquivo de dashboard personalizada que é inserido no index.ts

import React, { useEffect, useState } from 'react'
//importando alguns components do proprio adminjs
import {
  H1,
  H2,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@adminjs/design-system'
import { ApiClient, useCurrentAdmin } from 'adminjs'

export default function Dashboard() {
  const [resources, setResources] = useState<{ [key: string]: number }>()
  const [currentAdmin] = useCurrentAdmin()
  //api responsavel pela requisiçao da dashboard
  const api = new ApiClient()

  //useeffect para chamar puxar os dados toda vez que o componente for recarregado
  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    //pegando os dados da api(que vem em formato de json como especificado no index.ts) e inserindo nos resources atraves do usestate
    const res = await api.getDashboard()
    setResources(res.data)
  }
  return (
    <section style={{ padding: '1.5rem' }}>
      <H1>Seja bem-vindo(a), {currentAdmin?.firstName} </H1>

      <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF0043' }}>
              <TableCell style={{ color: '#FFF' }}>Recurso</TableCell>
              <TableCell style={{ color: '#FFF' }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources ? (
              Object.entries(resources).map(([resource, count]) => (
                <TableRow key={resource}>
                  <TableCell>{resource}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  )
}
