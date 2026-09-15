export default function Cabeçalho({ total, concluidas }) {
    const pendentes = total - concluidas
    return (
        <header className="cabeçalho">
            <h1 className="cabeçalho__titulo">Minhas Tarefas</h1>
            <div className="cabeçalho__estatisticas">

                
                <span className="cabeçalho__estatisticas">
                    <strong>{total}</strong> no total
                </span>


                <span className="cabeçalho__ponto" aria-hidden="true">•</span>
                <span className="cabeçalho__estatisticas">
                    <strong>{pendentes}</strong> pendentes{pendentes !== 1 ? 's' : ''}
                </span>


                <span className="cabeçalho__ponto" aria-hidden="true">•</span>
                <span className="cabeçalho__estatisticas">
                    <strong>{concluidas}</strong> concluídas
                </span>
            </div>
        </header>
    )
}