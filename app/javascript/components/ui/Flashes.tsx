export default function Flashes({
  flash,
}: {
  flash: { alert?: string; notice?: string };
}) {
  return (
    <>
      {flash.alert && (
        <span className="text-sm text-red-600">{flash.alert}</span>
      )}
      {flash.notice && (
        <span className="text-sm text-green-600">{flash.notice}</span>
      )}
    </>
  );
}
