const gltfLoader = new THREE.GLTFLoader();
const texture = new THREE.TextureLoader()

//values Planetes
var valeursPlanetes;
var slider = document.getElementById("myRange");
var focusOn = -1;

ROTATION_DELTA = 1;
slider.oninput = function() {
    ROTATION_DELTA = Math.pow(10, this.value);
}

function calcPosFromLatLonRad(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);
    x = -((radius) * Math.sin(phi) * Math.cos(theta));
    z = ((radius) * Math.sin(phi) * Math.sin(theta));
    y = ((radius) * Math.cos(phi)); //from  w ww.  d  em  o  2  s.c  o m
    return [x, y, z];
}


fetch("./valeurs.json")
    .then(response => {
        return response.json();
    }).then(valeursPlanetes => {
        //long/lat to x/y


        valeursPlanetes = valeursPlanetes["Planetes"]
            //scene
        const scene = new THREE.Scene();
        scene.background = texture.load('textures/univers.jpg')
            //camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.y = 30 + Math.log10(valeursPlanetes[8]["diametre"]);

        //renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //OrbitControls
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        //light
        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        //System Solaire
        var Planets = [];
        var axisPlanets = [];

        //Axis
        var gAxis = new THREE.SphereGeometry(0, 0, 0);
        var mAxis = new THREE.PointsMaterial({ size: 1, sizeAttenuation: false });

        //Soleil
        var mSoleil = new THREE.MeshBasicMaterial({
            map: texture.load("textures/sunmap.jpg")
        });
        var gSoleil = new THREE.SphereGeometry(Math.log10(valeursPlanetes[8]["diametre"]), 360, 360);
        Soleil = new THREE.Mesh(gSoleil, mSoleil);
        Soleil.geometry.computeVertexNormals(true);

        //Mercure
        var AxisMercure = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisMercure);
        axisPlanets.push(AxisMercure);

        var mMercure = new THREE.MeshBasicMaterial({
            map: texture.load("textures/mercurymap.jpg"),
        });
        mMercure.bumpMap = texture.load('textures/mercurybump.jpg');
        var gMercure = new THREE.SphereGeometry(Math.log10(valeursPlanetes[0]["diametre"]), 360, 360);
        Mercure = new THREE.Mesh(gMercure, mMercure);
        Mercure.geometry.computeVertexNormals(true);
        AxisMercure.add(Mercure);
        Planets.push(Mercure);

        //Vénus
        var AxisVenus = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisVenus);
        axisPlanets.push(AxisVenus);

        var mVenus = new THREE.MeshBasicMaterial({
            map: texture.load("textures/venusmap.jpg")
        });
        mVenus.bumpMap = texture.load('textures/venusbump.jpg');
        var gVenus = new THREE.SphereGeometry(Math.log10(valeursPlanetes[1]["diametre"]), 360, 360);
        Venus = new THREE.Mesh(gVenus, mVenus);
        Venus.geometry.computeVertexNormals(true);
        AxisVenus.add(Venus);
        Planets.push(Venus);

        //Terre
        var AxisTerre = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisTerre);
        axisPlanets.push(AxisTerre);

        var mTerre = new THREE.MeshBasicMaterial({
            map: texture.load('textures/earthmap1k.jpg')
        });
        mTerre.bumpMap = texture.load('textures/earthbump1k.jpg');
        mTerre.specularMap = texture.load('textures/earthspec1k.jpg');
        mTerre.specular = new THREE.Color('grey');
        mTerre.bumpScale = 0.05;
        var gTerre = new THREE.SphereGeometry(Math.log10(valeursPlanetes[2]["diametre"]), 360, 360);
        Terre = new THREE.Mesh(gTerre, mTerre);
        Terre.geometry.computeVertexNormals(true);
        AxisTerre.add(Terre);
        Planets.push(Terre);

        //Mars
        var AxisMars = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisMars);
        axisPlanets.push(AxisMars);

        var mMars = new THREE.MeshBasicMaterial({
            map: texture.load('textures/mars_1k_color.jpg'),
        });
        mMars.bumpMap = texture.load('textures/mars_1k_topo.jpg');
        mMars.specularMap = texture.load('textures/mars_1k_normal.jpg');
        mMars.specular = new THREE.Color('grey');
        mMars.bumpScale = 0.05;
        var gMars = new THREE.SphereGeometry(Math.log10(valeursPlanetes[3]["diametre"]), 360, 360);
        Mars = new THREE.Mesh(gMars, mMars);
        Mars.geometry.computeVertexNormals(true);
        AxisMars.add(Mars);
        Planets.push(Mars);

        //Jupiter
        var AxisJupiter = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisJupiter);
        axisPlanets.push(AxisJupiter);


        var mJupiter = new THREE.MeshBasicMaterial({
            map: texture.load('textures/jupiter2_1k.jpg')
        });
        var gJupiter = new THREE.SphereGeometry(Math.log10(valeursPlanetes[4]["diametre"]), 360, 360);
        Jupiter = new THREE.Mesh(gJupiter, mJupiter);
        Jupiter.geometry.computeVertexNormals(true);
        AxisJupiter.add(Jupiter);
        Planets.push(Jupiter);

        //Saturne
        var AxisSaturne = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisSaturne);
        axisPlanets.push(AxisSaturne);


        var mSaturne = new THREE.MeshBasicMaterial({
            map: texture.load('textures/saturnmap.jpg')
        });
        var gSaturne = new THREE.SphereGeometry(Math.log10(valeursPlanetes[5]["diametre"]), 360, 360);
        Saturne = new THREE.Mesh(gSaturne, mSaturne);
        Saturne.geometry.computeVertexNormals(true);
        AxisSaturne.add(Saturne);
        Planets.push(Saturne);

        //Saturne Ring
        const geometry = new THREE.RingBufferGeometry(3, 5, 64);
        var pos = geometry.attributes.position;
        var v3 = new THREE.Vector3();


        var gRingSaturne = new THREE.RingBufferGeometry(Math.log10(valeursPlanetes[5]["diametre"]) + 1, (Math.log10(valeursPlanetes[5]["diametre"]) + (Math.log10(valeursPlanetes[5]["diametre"] * 2))), 360, 20);
        var mRingSaturne = new THREE.ShaderMaterial({
            uniforms: {
                texture: { value: texture.load('textures/saturnringcolor.png') },
                innerRadius: { value: Math.log10(valeursPlanetes[5]["diametre"]) + 1 },
                outerRadius: { value: (Math.log10(valeursPlanetes[5]["diametre"]) + (Math.log10(valeursPlanetes[5]["diametre"] * 2))) }
            },
            vertexShader: `
                uniform float innerRadius;
                uniform float outerRadius;
          
                varying vec3 localPosition;
                
                void main() {
                  localPosition = position;
                  vec3 viewPosition = (modelViewMatrix * vec4(localPosition, 1.)).xyz;
                  gl_Position = projectionMatrix * vec4(viewPosition, 1.);
                }
              `,
            fragmentShader: `
                uniform sampler2D texture;
                uniform float innerRadius;
                uniform float outerRadius;
          
                varying vec3 localPosition;
          
                vec4 color() {
                  vec2 uv;
                  uv.x = (length(localPosition) - innerRadius) / (outerRadius - innerRadius);
                  if (uv.x < 0.0 || uv.x > 1.0) {
                    discard;
                  }
                  
                  vec4 pixel = texture2D(texture, uv);
                  return pixel;
                }
          
                void main() {
                  gl_FragColor = color();
                }
              `
        });
        mRingSaturne.bumpMap = texture.load('textures/saturnringpattern.gif')
        var pos = gRingSaturne.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            gRingSaturne.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
        }

        var RingSaturne = new THREE.Mesh(gRingSaturne, mRingSaturne);

        RingSaturne.rotateX(Math.PI / 2.3)
        Saturne.add(RingSaturne);

        //Uranus
        var AxisUranus = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisUranus);
        axisPlanets.push(AxisUranus);

        var mUranus = new THREE.MeshBasicMaterial({
            map: texture.load('textures/uranusmap.jpg')
        });
        var gUranus = new THREE.SphereGeometry(Math.log10(valeursPlanetes[6]["diametre"]), 360, 360);
        Uranus = new THREE.Mesh(gUranus, mUranus);
        Uranus.geometry.computeVertexNormals(true);
        AxisUranus.add(Uranus);
        Planets.push(Uranus);

        //Neptune
        var AxisNeptune = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisNeptune);
        axisPlanets.push(AxisNeptune);

        var mNeptune = new THREE.MeshBasicMaterial({
            map: texture.load('textures/neptunemap.jpg')
        });
        var gNeptune = new THREE.SphereGeometry(Math.log10(valeursPlanetes[7]["diametre"]), 360, 360);
        Neptune = new THREE.Mesh(gNeptune, mNeptune);
        Neptune.geometry.computeVertexNormals(true);
        AxisNeptune.add(Neptune);
        Planets.push(Neptune);

        //Lune
        var AxisLune = new THREE.Points(gAxis, mAxis);
        AxisTerre.add(AxisLune);

        var mLune = new THREE.MeshBasicMaterial({
            map: texture.load('textures/moonmap1k.jpg'),
        });
        mLune.bumpMap = texture.load('textures/moonbump1k.jpg');
        var gLune = new THREE.SphereGeometry(Math.log10(valeursPlanetes[2]["diametre"]) * (valeursPlanetes[9]["diametre"] / valeursPlanetes[2]["diametre"]), 360, 360);
        Lune = new THREE.Mesh(gLune, mLune);
        AxisLune.add(Lune);
        scene.add(Soleil);


        var mMarker = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var gMarker = new THREE.SphereGeometry(0.05, 360, 360);
        Marker = new THREE.Mesh(gMarker, mMarker);

        function getPosition() {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;
                pos = calcPosFromLatLonRad(crd.latitude, crd.longitude, Math.log10(valeursPlanetes[2]["diametre"]))
                Marker.position.set(pos[0], pos[1], pos[2]);
                Terre.add(Marker)
            }

            function error(err) {
                console.warn(`ERREUR (${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        getPosition()
            /* initialize rotation */
        axisPlanets.forEach(axisPlanet => {
            axisPlanet.rotation.y = Math.PI / Math.random();
        });
        Planets.forEach(Planet => {
            Planet.rotation.y = Math.PI / Math.random();
        });


        var v = new THREE.Vector3();
        controls.enablePan = true;
        var firstTime

        function animate() {

            i = 0
            axisPlanets.forEach(axisPlanet => {
                if (valeursPlanetes[i]["position"] != "3.5") {
                    axisPlanet.position.set(0, 0, 0);
                    axisPlanet.translateX(valeursPlanetes[i]["distance"]);
                    axisPlanet.rotateY((Math.PI * 2) / (valeursPlanetes[i]["period"] * 3600000 * 24) * ROTATION_DELTA);
                }
                i++;
            });

            j = 0
            Planets.forEach(Planet => {
                if (valeursPlanetes[j]["position"] != "3.5") {
                    Planet.position.set(0, 0, 0);
                    Planet.rotateY((Math.PI * 2) / (valeursPlanetes[j]["rotation"] * 3600000) * ROTATION_DELTA);
                }
                if (focusOn == j) {
                    controlsTarget(Planet)
                }
                j++;
            });

            AxisLune.position.set(0, 0, 0);
            AxisLune.translateX(Math.log10(valeursPlanetes[2]["diametre"]) * (valeursPlanetes[9]["diametre"] / valeursPlanetes[2]["diametre"] + Math.log10(valeursPlanetes[2]["diametre"]) + 1));
            AxisLune.rotateY((Math.PI * 2) / (valeursPlanetes[9]["period"] * 3600000 * 24) * ROTATION_DELTA);
            Lune.position.set(0, 0, 0);
            Lune.rotateY((Math.PI * 2) / (valeursPlanetes[9]["rotation"] * 3600000) * ROTATION_DELTA);

            if (focusOn == 8) {
                controlsTarget(Soleil)
            } else if (focusOn == 9) {
                controlsTarget(Lune)
            }
            RingSaturne.rotateZ(0.02);

            controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        $("#target-zoom").on("change", function() {
            focusOn = this.value;
            firstTime = true;
        });
        $(document).ready(function() {
            if ($("#checkbox").prop('checked')) {
                controls.enablePan = true;
                checkbox = true;
            } else {
                controls.enablePan = false;
                checkbox = false;
            }
        });


        $("#checkbox").click(function() {
            if ($(this).prop('checked')) {
                controls.enablePan = true;
                checkbox = true;
            } else {
                controls.enablePan = false;
                checkbox = false;
            }
        })

        function controlsTarget(obj) {
            v.copy(obj.position);
            obj.localToWorld(v);
            Soleil.worldToLocal(v);

            if (!checkbox) {
                camera.lookAt(v);
                console.log("checkbox")
            }
            if (firstTime) {
                console.log("firstTime")

                controls.target = v;
                camera.position.set(v.x, Math.log10(valeursPlanetes[focusOn]["diametre"]) * 30 / Math.log10(valeursPlanetes[8]["diametre"]) + Math.log10(valeursPlanetes[focusOn]["diametre"]), v.z);
                console.log(v)
                firstTime = false
            }
        }
    });