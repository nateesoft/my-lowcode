import React, { useState, useRef, useCallback, useEffect } from "react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  MarkerType,
  Panel
} from "reactflow"
import "reactflow/dist/style.css"

import LeftMenu from "./LeftMenu"
import PropertyPanel from "./PropertyPanel"
import PagePanel from './PagePanel'

import "./index.css"

const flowKey = "myflow_state"

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [property, setProperty] = useState({})
  const [showPage, setShowPage] = useState(false)

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            label: "connected",
            markerEnd: { type: MarkerType.Arrow }
          },
          eds
        )
      ),
    [setEdges]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")
      if (typeof type === "undefined" || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      let label = ""
      if (type === "input") {
        label = "Start"
      } else if (type === "output") {
        label = "Finish"
      } else if (type === "default") {
        label = "Process"
      }

      const newNode = {
        id: `node_${Math.random().toString(36).substring(2, 8)}`,
        type,
        position,
        data: { label },
        style: {
          width: 80,
          height: 50
        }
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const onNodeClick = () => {
    nodes.forEach((node) => {
      if (node.selected) {
        setProperty({
          id: node.id,
          label: node.data.label,
          type: node.type,
          component: "node"
        })
      }
    })
  }
  const onEdgeClick = () => {
    edges.forEach((edge) => {
      if (edge.selected) {
        setProperty({
          id: edge.id,
          label: edge.label,
          type: edge.type,
          component: "edge"
        })
      }
    })
  }

  const onPropertyChange = (props) => {
    if (props.component === "node") {
      nodes.forEach((node) => {
        if (node.selected) {
          const updNode = { ...node, data: { label: props.label } }
          setNodes((nds) => nds.concat(updNode))
        }
      })
    } else if (props.component === "edge") {
      edges.forEach((edge) => {
        if (edge.selected) {
          const updEdge = { ...edge, label: props.label }
          setEdges((eds) => eds.filter((item) => !item.selected))
          setEdges((eds) => eds.concat(updEdge))
        }
      })
    }
  }

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      localStorage.setItem(flowKey, JSON.stringify(flow))
    }
  }, [reactFlowInstance])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes, setEdges]);

  useEffect(() => {
    onRestore()
  }, [onRestore])

  return (
    <div className="dndflow">
      <LeftMenu />
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={() => setProperty({})}
            fitView
          >
            <Panel position="top-right">
              <button className="buttonPanel" onClick={onSave}>
                Save
              </button>
              <button className="buttonPanel" onClick={onRestore}>
                Restore
              </button>
            </Panel>
            <Controls />
            <MiniMap zoomable pannable />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <PropertyPanel props={property} onComponentChange={onPropertyChange} onShowPage={() => {setShowPage(!showPage); setProperty({})}} />
      <PagePanel show={showPage} onClose={()=>setShowPage(false)} />
    </div>
  )
}

export default DnDFlow
