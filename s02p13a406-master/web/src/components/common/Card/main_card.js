import React from 'react';
import { Card,  CardContent, Grid,  Typography,  Container, CardMedia} from '@material-ui/core'


const MainCard = () => {


    return(
        <Container maxWidth="md" component="main">
            <Grid container spacing={10} alignItems="flex-end">
                <Grid item  xs={12} sm={6} md={4}>
                    <Card>

                            <CardMedia style = {{ height: 0, paddingTop: '60%'}}
                            image= {require('../../../pages/card_image/개체관리.jpg')}
                            />
                        
                            <Typography align="center" variant='h4' >
                            개체관리
                            
                            </Typography>
                            <CardContent>
                            <Typography  variant="subtitle1" align="center">
                            개체 별 상태 확인을 통한 체계적 관리<br/>
                            발정확인을 통한 번식 증대를 통해 더 높은 이윤<br/>
                            지정한 시간마다 데이터를 수집합니다. <br/>
                            </Typography> 
                            </CardContent>

                    </Card>
                </Grid>
                <Grid item  xs={12} sm={6} md={4}>
                    <Card >
                    
                        <CardMedia style = {{ height: 0, paddingTop: '60%'}}
                        image= {require('../../../pages/card_image/축사관리.jpeg')}
                        />
                    
                        <Typography align="center" variant='h4' >
                        축사관리
                        
                        </Typography>
                        <CardContent>
                        <Typography  variant="subtitle1" align="center">
                        개체 별 상태 확인을 통한 체계적 관리<br/>
                        발정확인을 통한 번식 증대를 통해 더 높은 이윤<br/>
                        지정한 시간마다 데이터를 수집합니다. <br/>
                        </Typography> 
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item  xs={12} sm={6} md={4}>
                    <Card >
                            <CardMedia style = {{ height: 0, paddingTop: '60%'}}
                            image= {require('../../../pages/card_image/원격관리.jpg')}
                            />
                        
                            <Typography align="center" variant='h4' >
                            원격관리
                            
                            </Typography>
                            <CardContent>
                            <Typography  variant="subtitle1" align="center">
                            개체 별 상태 확인을 통한 체계적 관리 <br/>
                            발정확인을 통한 번식 증대를 통해 더 높은 이윤<br/>
                            지정한 시간마다 데이터를 수집합니다. <br/>
                            </Typography> 
                            </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MainCard;
