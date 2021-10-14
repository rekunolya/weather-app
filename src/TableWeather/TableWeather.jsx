export function TableWeather (props) {
    const data = props.data;
    return (
      <div>
      <table border = "1"  cellpadding="5">
      <tr>
        <th>Температура</th>
        <th>Ощущения</th>
        <th>Давление</th>
        <th>Влажность</th>
      </tr>
      <tr>
        <td>{data.temp}</td>
        <td>{data.feels_like}</td>
        <td>{data.pressure}</td>
        <td>{data.humidity}</td>
      </tr>
    </table>
    </div>

    )
}