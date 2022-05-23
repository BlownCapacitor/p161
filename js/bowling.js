AFRAME.registerComponent("ball", {
    init: function () {
        this.roll();
    },
    roll: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.3
                })
                ball.setAttribute("material", "color", "blue")
                var cam = document.querySelector("#camera");
                pos = cam.getAttribute("position");
                ball.setAttribute("position", {
                    x: pos.x, y: pos.y-1.5, z: pos.z

                })
                var cam2 = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                cam2.getWorldDirection(direction)
                ball.setAttribute("velocity", direction.multiplyScalar(-10))
                console.log(direction)
                var scene = document.querySelector("#scene");

                ball.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0.51",
                  });

                  ball.addEventListener("collide", this.removeBall);
          

                scene.appendChild(ball)
            }
        })
    },
    removeBall: function (e) {
        var ballcollide = e.detail.target.el;
        var hit = e.detail.body.el;
        if (hit.id.includes("pin")) {
          hit.setAttribute("material", {
            opacity: 0,
            transparent: true,
    
          });
          hit.setAttribute("dynamic-body",{
            mass:0.1
          })
          var impulse = new CANNON.Vec3(0.1, 0.1, 0.1)
          var worldPoint = new CANNON.Vec3().copy(
            hit.getAttribute("position")
          );
          hit.body.applyImpulse(impulse, worldPoint);
        ball.setAttribute("material",{
          opacity: 0,
          transparent:true,
        })
        ballcollide.removeEventListener("collide", this.roll);
        var sceneRemove = document.querySelector("scene");
        sceneRemove.removeChild(ball);
          }
      },
      })