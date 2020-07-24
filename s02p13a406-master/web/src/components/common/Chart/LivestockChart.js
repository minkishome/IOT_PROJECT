import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries,
  Legend,
  ZoomAndPan,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-datepicker';



const LivestockChart = ({ livestockData, ls_date, onChangeDate }) => {

  return (
    <Paper>
      <Chart
        data={livestockData}
      >
        <ValueScale name="body_temperature" modifyDomain={()=>[20, 45]} />
        <ValueScale name="step_count" />

        <ArgumentAxis />
        <ValueAxis scaleName="body_temperature" position="right" showGrid={false} showLine showTicks />
        <ValueAxis scaleName="step_count" position="right" showGrid={false} showLine showTicks />

        <SplineSeries
          name="체온"
          valueField="body_temperature"
          argumentField="t"
          scaleName="body_temperature"
          color="pink"
        />

        <SplineSeries
          name="활동량"
          valueField="step_count"
          argumentField="t"
          scaleName="step_count"
          color="lightblue"
        />
        <Animation />
        <Legend />
        <ZoomAndPan />
      </Chart>
      <Grid container> {/* grid 비율 바꿔야됨 */}
        <Grid item xs={12} sm={6}>
        <Chart
          data={livestockData}
          height={300}
        >
      
          <ValueScale name="body_temperature" modifyDomain={()=>[20, 45]} />

          <ArgumentAxis />
          <ValueAxis scaleName="body_temperature" position="right" showGrid={false} showLine showTicks />

          <SplineSeries
            
            name="체온"
            valueField="body_temperature"
            argumentField="t"
            scaleName="body_temperature"
            color="pink"
          />
          <Title text="체온" />
          <Animation />
          <ZoomAndPan />
        </Chart>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Chart
          data={livestockData}
          height={300}
        >
          <ValueScale name="step_count" />

          <ArgumentAxis />
          <ValueAxis scaleName="step_count" position="right" showGrid={false} showLine showTicks />

          <SplineSeries
            name="활동량"
            valueField="step_count"
            argumentField="t"
            scaleName="step_count"
            color="lightblue"
          />
          <Title text="활동량" />
          <Animation />
          <ZoomAndPan />
        </Chart>
        </Grid>
      </Grid>
      <DatePicker selected={ls_date} onChange={onChangeDate} />
    </Paper>
  );
}

export default LivestockChart;