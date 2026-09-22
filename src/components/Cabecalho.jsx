export default function Cabecalho({ total, concluidas }) {
    const pendentes = total - concluidas
    return (
        <header className="cabecalho">
            <h1 className="cabecalho__titulo">Minhas Tarefas</h1>
            <div className="cabecalho__estatisticas">

                
                <span className="cabecalho__estatisticas">
                    <strong>{total}</strong> no total
                </span>


                <span className="cabecalho__ponto" aria-hidden="true">•</span>
                <span className="cabecalho__estatisticas">
                    <strong>{pendentes}</strong> pendentes{pendentes !== 1 ? 's' : ''}
                </span>


                <span className="cabecalho__ponto" aria-hidden="true">•</span>
                <span className="cabecalho__estatisticas">
                    <strong>{concluidas}</strong> concluídas
                </span>
            </div>
        </header>
    )
}