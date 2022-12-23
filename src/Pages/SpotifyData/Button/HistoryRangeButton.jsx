import { StyledHistoryButton } from "./StyledHistoryButton"

export default function HistoryRangeButton({historyRange,setHistoryRange}){
    return(
        <StyledHistoryButton>
        <li><button className={historyRange === 'short' ? 'active' : ''} onClick={() => setHistoryRange('short')}>This Month</button></li>
        <li><button className={historyRange === 'medium' ? 'active' : ''} onClick={() => setHistoryRange('medium')}>Past 6 Months</button></li>
        <li><button className={historyRange === 'long' ? 'active' : ''} onClick={() => setHistoryRange('long')}>All Time</button></li>
        </StyledHistoryButton>
    )
}