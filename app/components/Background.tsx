export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      {/* 3D Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f29371d_1px,transparent_1px),linear-gradient(to_bottom,#1f29371d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />
      
      {/* Glowing Orbs (Lampu Neon 3D Background) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}