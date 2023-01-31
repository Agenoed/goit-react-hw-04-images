import { ThreeDots } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#DC143C"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
