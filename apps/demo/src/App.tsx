import {
  WorkCard,
  WorkCardHeader,
  WorkCardBody,
  WorkCardFooter,
  WorkCardActions,
  WorkCardAttrList,
  WorkCardAttrItem,
  WorkCardAttrLabel,
  WorkCardAttrValue,
  IconTodo,
  IconTask,
} from "@work-card/ui";
import { Button } from "@work-card/ui/button";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        gap: "16px",
        padding: "32px",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {/* 审批卡 */}
      <WorkCard>
        <WorkCardHeader icon={<IconTodo />} label="待审批" color="blue" />
        <WorkCardBody>
          <WorkCardAttrList>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>申请人</WorkCardAttrLabel>
              <WorkCardAttrValue>张三</WorkCardAttrValue>
            </WorkCardAttrItem>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>申请类型</WorkCardAttrLabel>
              <WorkCardAttrValue>年假申请</WorkCardAttrValue>
            </WorkCardAttrItem>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>申请时间</WorkCardAttrLabel>
              <WorkCardAttrValue>2026-04-02 至 2026-04-05</WorkCardAttrValue>
            </WorkCardAttrItem>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>备注</WorkCardAttrLabel>
              <WorkCardAttrValue>家中有事，请批准</WorkCardAttrValue>
            </WorkCardAttrItem>
          </WorkCardAttrList>
          <WorkCardActions>
            <Button variant="outline-destructive">拒绝</Button>
            <Button variant="outline-primary">同意</Button>
          </WorkCardActions>
        </WorkCardBody>
        <WorkCardFooter />
      </WorkCard>

      {/* 任务卡 */}
      <WorkCard>
        <WorkCardHeader icon={<IconTask />} label="进行中" color="green" />
        <WorkCardBody>
          <WorkCardAttrList>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>任务名称</WorkCardAttrLabel>
              <WorkCardAttrValue>Q2 需求评审</WorkCardAttrValue>
            </WorkCardAttrItem>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>负责人</WorkCardAttrLabel>
              <WorkCardAttrValue>李四</WorkCardAttrValue>
            </WorkCardAttrItem>
            <WorkCardAttrItem>
              <WorkCardAttrLabel>截止日期</WorkCardAttrLabel>
              <WorkCardAttrValue>2026-04-10</WorkCardAttrValue>
            </WorkCardAttrItem>
          </WorkCardAttrList>
          <WorkCardActions>
            <Button variant="outline">稍后处理</Button>
            <Button variant="outline-primary">完成</Button>
          </WorkCardActions>
        </WorkCardBody>
        <WorkCardFooter />
      </WorkCard>
    </div>
  );
}
