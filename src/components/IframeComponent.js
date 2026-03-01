export default function FrameComponent({ redirect_url }) {
  return (
    <div className="max-w-[500px] min-w-[400px]  mx-auto ">
      <p className="text-center font-outfit text-sm">Please wait......</p>
        <iframe
            src={redirect_url}
            title="Pesapal Iframe"
            style={{
            width: '100%',
            height: '100%',
            minHeight: '700px', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '0.375rem'
            }}
            allowFullScreen
        />
    </div>
  )
}
