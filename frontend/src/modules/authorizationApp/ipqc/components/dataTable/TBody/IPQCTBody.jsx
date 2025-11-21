import { HOUR_LIST } from "@modules/pinhole/PinholeConstantData";

const IPQCTBody = () => {
  return (
    <tbody className="relative">
      {HOUR_LIST.map((hour, idx) => (
        <tr key={idx} className="border-t">
          <td className="w-25 border-r text-center">
            {hour}
          </td>
        </tr>
      ))}
    </tbody>
  )
};

export default IPQCTBody;