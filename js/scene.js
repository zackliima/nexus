import * as THREE from '../vendor/three.module.js';

/** Esfera procedural: sem modelo externo, sem textura e sem pós-processamento.
 * Veja docs/03-animacoes.md para a distribuição de Fibonacci e as escolhas de custo. */
export function createScene(host, initialReduced = false) {
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.append(renderer.domElement);
  const world = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  camera.position.z = 7.2;
  const group = new THREE.Group();
  world.add(group);
  const count = innerWidth < 700 ? 150 : 250;
  const vertices = [];
  const vectors = [];
  const colors = [];
  for (let i=0;i<count;i++) {
    const y = 1-(i/(count-1))*2;
    const radius = Math.sqrt(1-y*y);
    const theta = Math.PI*(3-Math.sqrt(5))*i;
    const point = new THREE.Vector3(Math.cos(theta)*radius,y,Math.sin(theta)*radius).multiplyScalar(1.8);
    vectors.push(point); vertices.push(point.x,point.y,point.z);
    const color = new THREE.Color().lerpColors(new THREE.Color('#77e3d5'),new THREE.Color('#bc94ff'),(y+1)/2);
    colors.push(color.r,color.g,color.b);
  }
  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  pointsGeometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const points = new THREE.Points(pointsGeometry,new THREE.PointsMaterial({size:.028,vertexColors:true,transparent:true,opacity:.95}));
  group.add(points);
  const edges = [];
  for(let i=0;i<count;i++) for(let j=i+1;j<count;j++) {
    if(vectors[i].distanceTo(vectors[j]) < .51) edges.push(...vectors[i].toArray(),...vectors[j].toArray());
  }
  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(edges,3));
  group.add(new THREE.LineSegments(edgeGeometry,new THREE.LineBasicMaterial({color:'#a493e0',transparent:true,opacity:.24})));
  const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22,2),new THREE.MeshBasicMaterial({color:'#514174',wireframe:true,transparent:true,opacity:.08}));
  group.add(inner);
  // Três órbitas: geometria legível mesmo com baixa densidade de pixels.
  for(let i=0;i<3;i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.13+i*.12,.005,4,180),new THREE.MeshBasicMaterial({color:i===1?'#8fd6ce':'#a799cf',transparent:true,opacity:.38}));
    ring.rotation.set(Math.PI/2+i*.4,i*.6,.3+i*.5);
    group.add(ring);
  }
  group.rotation.z = -.2;
  let reduced = initialReduced, visible = true, frame = 0, last = 0, angle = 0;
  const pointer = {x:0,y:0};
  function resize() {
    const {width,height} = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height,false);
    renderer.render(world,camera);
  }
  const resizer = new ResizeObserver(resize);resizer.observe(host);resize();
  function draw(time) {
    frame = 0;
    if(reduced || !visible || document.hidden) return;
    const delta = Math.min((time-last)/1000,.04);last=time;angle+=delta*.09;
    group.rotation.y=angle+pointer.x*.13;
    group.rotation.x+=(pointer.y*.1-group.rotation.x)*.025;
    renderer.render(world,camera);
    frame=requestAnimationFrame(draw);
  }
  function sync() {
    cancelAnimationFrame(frame);frame=0;
    if(!reduced && visible && !document.hidden){last=performance.now();frame=requestAnimationFrame(draw);}
    else renderer.render(world,camera);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'});
  observer.observe(host);
  document.addEventListener('visibilitychange',sync);
  const hero = document.querySelector('.hero');
  hero.addEventListener('pointermove',event=>{if(event.pointerType==='mouse'){const r=hero.getBoundingClientRect();pointer.x=(event.clientX-r.left)/r.width-.5;pointer.y=(event.clientY-r.top)/r.height-.5;}});
  renderer.domElement.addEventListener('webglcontextlost', event=>{event.preventDefault();visible=false;cancelAnimationFrame(frame);host.parentElement.classList.remove('is-ready');});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{visible=true;resize();host.parentElement.classList.add('is-ready');sync();});
  host.parentElement.classList.add('is-ready');sync();
  return {setReduced(value){reduced=value;sync();}};
}
