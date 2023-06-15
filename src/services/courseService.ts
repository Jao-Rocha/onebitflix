import { Course } from '../models'

//os controlers vao ser basicamente os metodos utilizados para manipular ou obter algo do banco
// os services sao metodos que vao servir aos controllers , é um maneira de deixar o codigo mias organizado , fascilidando seu entendimento.
// e os models sao basicamente o banco de dados no cosigo , estrutura do banco por exemplo , assim se eu importar o arquivo de courses eu terei ascesso a tabela de coursos do banco

export const courseService = {
  findbyIdWithEpisodes: async (id: string) => {
    //aqui no findByPk , eu informo o id que é minha primary key , dps eu passo um objeto informando o que eu quero que seja trago , os atributos da tabela , e o include se refere ao o que ela se associa , no caso aqui é associado aos episodes , então vai trazer as informações dos episodes.
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      include: {
        association: 'episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url', 'videoUrl'], //apenas conversao de nomes , pois no banco de dados o padrao é snake case, e aqui o padrao é camel case
          ['seconds_long', 'secondslong']
        ],
        order: [['order', 'ASC']], //ordenar em referencia ao campo order de forma ascendente
        separate: true // para o order funcionar , esse separete deve ser setado como true
      }
    })
    return courseWithEpisodes
  },

  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where: {
        featured: true
      }
    })

    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random() //metodo random vai gerar um numero aleatorio entre 0 e 1
    )
    return randomFeaturedCourses.slice(0, 3) //slice vai cortar o array e criar um novo , pegando do index 0 ao 2
  }
}
